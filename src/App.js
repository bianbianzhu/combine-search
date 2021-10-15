import { useEffect, useState } from "react/cjs/react.development";
import "./App.scss";
import DashBoard from "./pages/DashBoard";
import * as qs from "qs";
import { cleanEmptyParam, paramAttributeNameChange } from "./utils/FormatParam";
import pipe from "lodash/fp/pipe";

const api = "http://localhost:5599";

function App() {
  //////////从数据库拿user信息，
  const [users, setUsers] = useState([]);
  /////////这个state是用于存searchSection中 下拉菜单选择了的 user的id 以及 text input 里面录入的incident的名字
  const [searchParam, setSearchParam] = useState({
    user_id: "",
    incident_name: "",
  });
  //////////////从数据库拿incident 信息
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch(`${api}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  ////////////////////////////////////////////////////////////////

  const formatParam = (param) => {
    const copiedParam = { ...param };

    ///三步走，删除空的param, 要是param都是空的，那拿来的数据就是全部incidents， 相当于/incidents
    /// 这里的逻辑是， 如果param的这个object里，任何值是空，“ ” （default值就是“ ”）， 那么删除key和value的pair

    ///这个逻辑中，还得考虑，如果值是0的特殊情况。 一般来说，如果值为0，那也不是 空值，这个得单独拿出来设定

    const isFalsy = (value) => (value === 0 ? false : !value); //如果不懂 见下文

    ///简单的逻辑，user_id ， incident_name 如果为空， 整个key value pair 都给删了
    // const deleteEmptyParam = (copiedParam) => {

    //   if (isFalsy(copiedParam.user_id)) {
    //     delete copiedParam["user_id"];
    //   }

    //   if (isFalsy(copiedParam.incident_name)) {
    //     delete copiedParam["incident_name"]
    //   }

    //   return copiedParam;
    // }

    //把上面的写好看点

    const deleteEmptyParam = (copiedParam) => {
      Object.keys(copiedParam).map((key) => {
        if (isFalsy(copiedParam[key])) {
          delete copiedParam[key];
        }
        ///how to deal with this problem???? 这个map 需要return一个array，是不是用for each 比较好
      });
      return copiedParam;
    };

    ///将param里面的incident_name 改为 name， 因为数据库里面就是用的name

    const changeIncidentNameToName = (noEmptyParam) => {
      // let changedNameParam;
      // Object.keys(noEmptyParam).map((key) => {
      //   if (key === "incident_name") {
      //      changedNameParam = {...noEmptyParam, name: noEmptyParam[key]}//在复制一份？
      //     delete changedNameParam[key];
      //   }
      // })

      // console.log(changedNameParam);
      // return changedNameParam;

      const value = noEmptyParam.incident_name;
      delete noEmptyParam["incident_name"];

      return { ...noEmptyParam, name: value };
    };

    //把object的结构改成 ///qs.stringfy -> searchParam {user_id: "123123123", incident_name: "projectOne"}  ===> user_id=0492421760&incident_name=incident20
    //这样api 才起作用
    const stringfiedParam = qs.stringify(
      changeIncidentNameToName(deleteEmptyParam(copiedParam))
    );

    return stringfiedParam;
  };

  //一般来说 “” 是false， 但是 0 也是false， 我们不想0是false，想他是true， 那么我们可以这么来
  // const isTrue = (value) => {

  //   if (value === 0) {
  //     return true;
  //   } else {
  //     return value;
  //   }
  // }

  // const isTrue = (value) => (value === 0? true:value);
  //这个很好理解，但是 一般我们用 isFalsy来做

  //  const isFalsy = (value) => {
  //    if (value === 0) {
  //      return false; //是falsy吗？？？ 不是的 -》 那就是true了
  //    } else {
  //      return !value; //这里的情况有， 不为空， 那！value 就是false =》 是falsy吗？ 不是的 =》 那就是true了|||||| 为空， 那！value 就是true了 =》 是falsy吗？ 是的， 那就是false了
  //    }
  //  }

  //  const isFalsy = (value) => (value === 0? false: !value);

  //   const check = (value) => {

  //     if (isFalsy(value)) {
  //       console.log('false');
  //     } else {
  //       console.log('true');
  //     }
  //   }

  //  check("");



  const pipedFormatParam = pipe(
    cleanEmptyParam,
    paramAttributeNameChange,
    qs.stringify
  )


const getCurrentP = (callback) => {
   
  setTimeout(() => {
    callback('currentPosition')
  }, 2000)
}

getCurrentP((position) => {
  console.log(position);
})





  ////incident 每次根据 searchParam的更改而更改
  useEffect(() => {
    fetch(`${api}/incidents?${formatParam(searchParam)}`).then(
      async (response) => {
        if (response.ok) {
          setIncidents(await response.json());
        }
      }
    );
  }, [searchParam]);

  return (
    <>
      <DashBoard
        users={users}
        setSearchParam={setSearchParam}
        searchParam={searchParam}
        incidents={incidents}
      />
    </>
  );
}

export default App;
