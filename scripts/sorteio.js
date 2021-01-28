module.exports = robot => {
  robot.respond(/vamos fazer um sorteio/i, (res) => {
    res.send("Use o comando: coutobot bota <alguma coisa>\npara adicionar <alguma coisa> a lista")
  })

  robot.respond(/bota (.*)/i, (res) => {
    algumaCoisa = res.match[1]
    const lista = robot.brain.get('sorteio') || []
    robot.brain.set('sorteio', [...lista, algumaCoisa])

    res.reply(`Adicionei: ${algumaCoisa} na lista do sorteio`)
  })

  robot.respond(/tira o (.*)/i, (res) => {
    let q = res.match[1]
    try {
      q = parseInt(q)
    } catch (e) {}

    lista = robot.brain.get('sorteio') || []
    if (isNaN(q)) {
      res.reply("manda um numero pra tirar carai")
      return
    } else {
      lista = lista.splice(q, 1)
      robot.brain.set('sorteio', lista)
    }

    res.send(`tirei o ${q}... a lista ta assim:\n ${lista}`)
  })

  robot.hear(/como ta o sorteio/i, (res) => {
    const  sorteio = robot.brain.get('sorteio')
    if (sorteio == null) {
      res.send("Não lembro de nenhum sorteio.\nUse: coutobot vamos fazer um sorteio")
    } else {
      msg = ""
      sorteio.forEach((item, index) => {
        msg += `${index+1}. ${item}\n`
      })
      res.send(`A lista ta assim:\n ${msg}`)
    }
  })

  robot.hear(/sorteia/i, (res) => {
    const sorteio = robot.brain.get('sorteio')
    if (sorteio == null) {
      res.send("Não lembro de nenhum sorteio.\nUse: coutobot vamos fazer um sorteio")
    } else {
      res.send(`Sorteio deu: ${res.random(sorteio)}`)
    }
  })
}
