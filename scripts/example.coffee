#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = (robot) ->

  #QUAL A BOA function conde
  robot.respond /set boa (.*)/i, (res) ->
      almocoType = res.match[1]
      robot.brain.set 'almocoGlobal', almocoType

      res.reply "A boa foi setada para: #{almocoType}"

    robot.hear /qual a boa/i, (res, almocoType) ->
      local = robot.brain.get('almocoGlobal')
      res.send "A boa é #{local}"
    #END OF: QUAL A BOA

    #AUTOMATIC RESPONSES
    robot.hear /vacilao/i, (res) ->
      res.send "vasilao morre cedo"

    robot.hear /vasilao/i, (res) ->
     res.send "vacilao morre cedo"

    lulz = ['lol', 'lel', 'lel', 'kek', 'kek', 'lel', 'kek']
    robot.hear /kek/i, (res) ->
      res.send res.random lulz
    #END OF AUTOMATIC RESPONSES
