import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from './views/PostView.js';
import Settings from "./views/Settings.js";

// 예) /posts/:id => "/posts/2".match(/^\posts\/(.+)%/)
// we have capture group: we can the capture the infromation inside actual path itself
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
  const value = match.result.slice(1);
  // keys refers to id(/:id)
  // it' gonna matchAll is going to match every single individual parameter
  const keys = Array.from(match.root.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  // looping throug each one of keys themselves
  // fromEntreis: 키와 값의 쌍의 배열을 객체로 바꿈
  return Object.fromEntries(keys.map((key, i) => {
    return [key, value[i]]
  }))
}

// whenever the link  data-link run navigateTo instead of the default behavior of refreshing the page
const navigateTo = url => {
  history.pushState(null, null, url)
  router();
}

//async: loading the contents for each one of views(SPA의 페이지 데이터)
//setting tab maybe the actual client side want to make an async request to the server side to get some settings before it actually redners or shows the page
const router = async() => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
  ];

  const potentialMatches = routes.map(route => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)) === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  if(!match){
    match = {
      route: routes[0],
      result: [location.pathname]
    }
  }
  console.log(match)

  const view = new match.route.view(getParams(match));

  document.querySelector('#app').innerHTML = await view.getHtml();

}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () =>{ 
  document.body.addEventListener("click", e=>{
    if(e.target.matches("[data-link]")){
      //data-link 속성을 부여한 a태그
      e.preventDefault();
      navigateTo(e.target.href);
      // history api에 추가 되고
      // router실행 => without refresh => html다운받지 않음
    }
  })
  
  router()
  // 즉 첫 렌더링 이후에 실행됨
  // 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 이후 실행
})