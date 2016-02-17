export default function () {
  this.get('/nodes', function (db) {
    return {
      data: db.nodes
    }
  })
  this.passthrough()
}
