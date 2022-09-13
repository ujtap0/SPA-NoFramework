import AbstractView from "./AbstractViews.js";

export default class extends AbstractView{
  constructor(params){
    super(params);
    this.setTitle("Viewing Post")
  }
  async getHtml () {
    return `
    <h1>Welcome back, dom</h1>
     <h2>${this.params.id}</h2>
      <p>
        포스트 렌더링
      </p>
    `;
  }
}