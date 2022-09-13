import AbstractView from "./AbstractViews.js";

export default class extends AbstractView{
  constructor(params){
    super(params);
    this.setTitle("Dashboard")
  }
  async getHtml () {
    return `
      <h1>Welcome back, dom</h1>
      <p>
        대시보드 렌더링
      </p>
      <p>
        <a href="/posts" data-link>View recent posts</a>
      </p>
    `;
  }
}