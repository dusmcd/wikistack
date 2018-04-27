const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Author Name</label>
      <input type="text" class="form-control" id="name">
    </div>
    <div class="form-group">
      <label for="email" class="col-sm-2 control-label">Author E-mail</label>
      <input type="text" class="form-control" id="email">
    </div>
    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>
    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Content</label>
      <textarea class="form-control" name="content" id="content" rows="5"></textarea>
    </div>
    <div class="form-group">
      <label for="status" class="col-sm-2 control-label">Status</label>
      <select id="status" name="status">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
