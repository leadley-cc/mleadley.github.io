const app = () => {
  const width = document.body.clientWidth
  const height = document.body.clientHeight

  const canvas = document.querySelector('canvas#background')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  const cellSize = 80

  const colourA = [255, 228, 196]
  const colourB = [164, 221, 237]

  const generatePoints = () => {
    const cellCountX = Math.floor(width / cellSize + 4)
    const cellCountY = Math.floor(height / cellSize + 4)
    const paddingX = ((cellCountX * cellSize) - width) / 2
    const paddingY = ((cellCountY * cellSize) - height) / 2
    const endX = width + paddingX
    const endY = height + paddingY
    const halfCell = cellSize / 2

    const points = []
    for (let i = -paddingX; i < endX; i += cellSize) {
      for (let j = -paddingY; j < endY; j += cellSize) {
        var x = (i + halfCell) + (Math.random() * 40) - 20
        var y = (j + halfCell) + (Math.random() * 40) - 20
        points.push([Math.floor(x), Math.floor(y)])
      }
    }
    return points
  }

  const colourLookup = (position) => {
    const colour = [
      Math.round(position * (colourA[0] - colourB[0]) + colourB[0]),
      Math.round(position * (colourA[1] - colourB[1]) + colourB[1]),
      Math.round(position * (colourA[2] - colourB[2]) + colourB[2])
    ]
    return `rgb(${colour[0]},${colour[1]},${colour[2]})`
  }

  const renderTriangle = (vertices) => {
    const randPos = (Math.random() + Math.random() + Math.random()) / 3
    context.strokeStyle = context.fillStyle = colourLookup(randPos)
    context.beginPath()
    context.moveTo.apply(context, vertices[0])
    context.lineTo.apply(context, vertices[1])
    context.lineTo.apply(context, vertices[2])
    context.fill()
    context.stroke()
  }

  const generateTriangles = (points) => {
    const delaunator = new Delaunator(points)
    const triangleIndices = delaunator.triangles
    const triangles = []
    for (let i = 0; i < triangleIndices.length; i += 3) {
      var vertices = [
        points[ triangleIndices[i] ],
        points[ triangleIndices[i + 1] ],
        points[ triangleIndices[i + 2] ]
      ]
      triangles.push(vertices)
    }
    return triangles
  }

  const renderRandom = () => {
    const randomIndex = Math.floor(Math.random() * triangles.length)
    renderTriangle(triangles[randomIndex])
  }

  const points = generatePoints()
  const triangles = generateTriangles(points)
  triangles.forEach(vertices => renderTriangle(vertices, 0.95))
  setInterval(renderRandom, 50)
}

window.addEventListener('DOMContentLoaded', app)
