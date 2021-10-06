function draw() {
    try {
      const expression = document.getElementById('eq').value
      const node = math.parse(expression)
      const expr = node.compile()

    function differentiaion(x, h){
        let scope = {
          x: x
        }
        let delta = x+h;
        fd = expr.evaluate(scope)
        scope.x = delta;
        fx = expr.evaluate(scope)
        fprimex = (fx-fd)/h;
        return fprimex
    }
      const xValues = math.range(-10, 10, 0.1).toArray()
      const yValues = xValues.map(function (x) {
        return expr.evaluate({x: x})
      })
      const ypValues = xValues.map(x => differentiaion(x,0.0001))

      const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: `f(x)`
      }
      const trace2 = {
        x: xValues,
        y: ypValues,
        type: 'scatter',
        name: `f'(x)`
      }
      const data = [trace1, trace2]
      Plotly.newPlot('plot', data)
    }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }

  document.getElementById('form').onsubmit = function (event) {
    event.preventDefault()
    draw()
  }

  draw()