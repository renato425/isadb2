const isadb2 = require('isadb2')

async function main() {
  await isadb2.create()
  await isadb2.set('object', {name: 'Bento', sobrenome: 'Silva'})
  await isadb2.set('array', ['Ada', 'Ebi'])
  await isadb2.set('foo', 'bar')
  console.log(await isadb2.get('object'))
  isadb2.get('object.name').then(value => {
    console.log(value)
  })
  console.log(await isadb2.get('array'))
  isadb.get('foo').then(value => {
    console.log(value)
  })
}
