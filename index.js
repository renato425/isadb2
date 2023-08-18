const fs = require('fs')

function valueForLine(varia, value) {
    if (typeof value === 'number') {
      return `$${varia}[Number(${value})]`;
    } else if (Array.isArray(value)) {
      return `$${varia}[Array(${value.join(', ')})]`
    } else if (typeof value === 'object') {
      return `$${varia}[JSON(${JSON.stringify(value)})]`;
    } else if (typeof value === 'string') {
      return `$${varia}[${value}]`;
    } else {
      console.error("Value not recognized");
      return '';
    }
  }
  
  function saveValue(varia, value) {
    return new Promise((resolve, reject) => {
        let novaVar = '';
        fs.readFile('db.isadb2', 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading db.isadb2")
                return
            } else {
              const parts = varia.split('.')
            const variable = parts.shift()
                let lines = data.split('\n')
                let updatedLines = []
                let foundMatch = false
                lines = lines.filter(line => !line.includes(`$${varia}[`))
                for (const line of lines) {
                    if (!line.trim().startsWith("#")) {
                      if (line.includes(`$${variable}[`)) {
                        foundMatch = true;
                        if (typeof varia === 'string' && varia.includes('.')) {
                            if (typeof varia === 'string' && varia.includes('.')) {
                                fs.readFile('./db.isadb2', 'utf8', (err, data) => {
                                    const regex = new RegExp(`\\$${variable}\\[(.*?)\\]`)
                                    const match = data.match(regex)
                                    if (match && match[1]) {
                                        try {
                                            const potentialValue = match[1].trim()
                                            if (potentialValue.startsWith('JSON(') && potentialValue.endsWith(')')) {
                                                let jsonObject = JSON.parse(potentialValue.substring(5, potentialValue.length - 1));
                                                let string = ''
                                                for (const i in parts) {
                                                  string += `['${parts[i]}']`
                                                }
                                                eval(`jsonObject${string} = ${JSON.stringify(value)}`)
                                                const newData = data.replace(match[1], `JSON(${JSON.stringify(jsonObject)})`)
                                                updatedLines.push(newData)
                                                updatedLines = updatedLines.filter(line => line !== '')
                                                let updatedData = updatedLines.join('\n')
                  if (!foundMatch) {
                    updatedData += `\n${valueForLine(varia, value)}`
                  } 
    
                  fs.writeFile('./db.isadb2', updatedData, 'utf-8', (err) => {
                    if (err) {
                        reject('Error on save.')
                    } else resolve(true)
                  })
                                              }
                                        } catch (err) {
                                            console.error("Error ", err)
                                        }
                                    }
                                })
                            } else {
                            if (typeof value === 'number') {
                              novaVar = `$${varia}[Number(${novaVar})]`;
                            } else if (Array.isArray(value)) {
                              novaVar = `$${varia}[Array(${novaVar.join(', ')})]`
                            } else if (typeof value === 'object') {
                              novaVar = `$${varia}[JSON(${JSON.stringify(value)})]`;
                            } else if (typeof value === 'string') {
                              novaVar = `$${varia}[${value}]`;
                            } else return console.error("Value not recognized");
                                // const att = data + '\n' + novaVar;
                                updatedLines.push(valueForLine(varia, novaVar))
                                let updatedData = updatedLines.join('\n')
                  if (!foundMatch) {
                    updatedData += `\n${valueForLine(varia, value)}`
                  } 
    
                  fs.writeFile('./db.isadb2', updatedData, 'utf-8', (err) => {
                    if (err) {
                        reject('Error on save.')
                    } else resolve(true)
                  })
                              }
                        } else {
                          updatedLines.push(valueForLine(varia, value));
                          let updatedData = updatedLines.join('\n')
                  if (!foundMatch) {
                    updatedData += `\n${valueForLine(varia, value)}`
                  } 
    
                  fs.writeFile('./db.isadb2', updatedData, 'utf-8', (err) => {
                    if (err) {
                        reject('Error on save.')
                    } else resolve(true)
                  })
                        }
                      } else {
                        updatedLines.push(line);
                        let updatedData = updatedLines.join('\n')
                  if (!foundMatch) {
                    updatedData += `\n${valueForLine(varia, value)}`
                  } 
    
                  fs.writeFile('./db.isadb2', updatedData, 'utf-8', (err) => {
                    if (err) {
                        reject('Error on save.')
                    } else resolve(true)
                  })
                      }
                    } else {
                      updatedLines.push(line);
                      let updatedData = updatedLines.join('\n')
                  if (!foundMatch) {
                    updatedData += `\n${valueForLine(varia, value)}`
                  } 
    
                  fs.writeFile('./db.isadb2', updatedData, 'utf-8', (err) => {
                    if (err) {
                        reject('Error on save.')
                    } else resolve(true)
                  })
                    }
                  }
            }
        })
    })
}

function deleteValue(varia) {
  return new Promise((resolve, reject) => {
    fs.readFile('db.isadb2', 'utf-8', (err,data) => {
      if (err) {
        console.error('Error read file')
        return
      }
      const lines = data.split('\n')
      const updatedLines = []
      for (const line of lines) {
        if (!line.trim().startsWith('#') && !line.includes(`$${varia}[`))
        updatedLines.push(line)
      }
      const updatedData = updatedLines.join('\n')
      fs.writeFile('db.isadb2', updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Error on update')
        } else resolve(true)
      })
    })
  })
}

function processValue(data, variable) {
  const regex = new RegExp(`\\$${variable}\\[(.*?)\\]`);
  const match = data.match(regex);
  if (match && match[1]) {
    try {
      const potentialValue = match[1].trim();
      if (potentialValue.startsWith("JSON(") && potentialValue.endsWith(")")) {
        const jsonObject = JSON.parse(potentialValue.substring(5, potentialValue.length - 1));
        return jsonObject;
      } else if (potentialValue.startsWith("Number(") && potentialValue.endsWith(")")) {
        const numberValue = Number(eval(potentialValue));
        return numberValue;
      } else if (potentialValue.startsWith('Array(') && potentialValue.endsWith(')')) {
        // console.log(potentialValue.substring(6, potentialValue.length - 1))
        // const jsonObject = JSON.parse(potentialValue.substring(6, potentialValue.length - 1) + ']')
        // return jsonObject
        let potential = potentialValue.substring(6, potentialValue.length - 1);
        let array = []
        let splitted = potential.split(', ')
        for (const i in splitted) {
          if (splitted[i].startsWith('JSON(') && splitted[i].endsWith(')')) {
            array.push(JSON.parse(splitted[i].substring(5, splitted[i].length - 1)))
          } else if (splitted[i].startsWith('Number(') && splitted[i].endsWith(')')) {
            const numberValue = Number(eval(splitted[i]))
            array.push(numberValue)
          } else array.push(splitted[i])
        }
        return array
      } else {
        return potentialValue;
      }
    } catch (error) {
      console.error("Error while processing value:", error);
      return null;
    }
  }
  return null;
}

function getValue(path) {
    return new Promise((resolve, reject) => {
        fs.readFile('./db.isadb2', 'utf8', (err, data) => {
          if (err) {
            console.error("Error while reading the file db.isadb2");
            return;
          }
      
          // Removendo linhas que começam com "#" (comentários)
          const filteredData = data
            .split('\n')
            .filter(line => !line.trim().startsWith("#"))
            .join('\n');
      
          const parts = path.split('.');
          const variable = parts.shift(); // Remove o primeiro elemento que é a variável
          const result = processValue(filteredData, variable);
          let value = result;
      
          for (const part of parts) {
            if (value && typeof value === 'object' && value.hasOwnProperty(part)) {
              value = value[part];
            } else {
              console.log("Invalid path or value not found.");
              return;
            }
          }
        resolve(value)
    })
  });
}

function create() {
    return new Promise((resolve, reject) => {
        fs.access('./db.isadb2', fs.constants.F_OK, (err) => {
          if (err) {
            fs.writeFile('./db.isadb2', '', 'utf8', (err) => {
                if (err) {
                    resolve(true)
                } else resolve(true)
            });
          } else resolve(true)
        });
    })
  }


  
//   export { getValue as get }
//   export { saveValue as set }
//   export { create }
//   export { deleteValue as delete }
  
  module.exports.get = getValue
  module.exports.set = saveValue
  module.exports.create = create
  module.exports.delete = deleteValue