export const cssTemplate = `
  .card {
    margin-top: 12px;
  }

  .btn {
    margin: 12px 0;
  }
`

export function getLoadMoreButton(className) {
  return `<div class="${className} btn btn-primary">載入更多</div>`
}

export function getForm(className, commentsClassName) {
  return `
  <div>
    <form class="${className}">
      <div class="mb-3">
        <label class="form-label">暱稱</label>
        <input type="text" name="nickname" class="form-control" >
      </div>
      <div class="form-group">
        <label>留言內容</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
      <div class="${commentsClassName}">
      </div>
    </form>
  </div>
`
}
