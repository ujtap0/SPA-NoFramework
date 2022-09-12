import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

// whenever the link  data-link run navigateTo instead of the default behavior of refreshing the page
const navigateTo = url => {
  history.pushState(null, null, url)
  router();
}

//async: loading the contents for each one of views(SPA의 페이지)
//setting tab maybe the actual client side want to make an async request to the server side to get some settings before it actually redners or shows the page
const router = async() => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
  ];

  const potentialMatches = routes.map(route => {
    return {
      route,
      isMatch: location.pathname === route.path
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  if(!match){
    match = {
      route: routes[0],
      isMatch: true
    }
  }
  console.log(match)

  const view = new match.route.view();

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