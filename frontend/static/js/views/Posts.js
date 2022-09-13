import AbstractView from "./AbstractViews.js";

export default class extends AbstractView{
  constructor(params){
    super(params);
    this.setTitle("Posts")
  }
  async getHtml () {
    return `
      <h1>Welcome back, dom</h1>
      <p>
        포스트 렌더링
      </p>
    `;
  }
}