$(function() {
    Initialize();
    setTimeout(DrawLoop, 1000);
});

var cars = [];
var graph = {};
var paper = {};

function Initialize() {
    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
        el: $('#paper'),
        width: 800,
        height: 800,
        gridSize: 10,
        model: graph
    })
    .on('cell:pointerclick', function (clickedView, evt, x, y) {
        evt.stopPropagation();
        // unhighlight all cells
        $.each(graph.getCells(), function(index, cell) {
            var cView = paper.findViewByModel(cell);
            cView.unhighlight();
        });

        // higlight the clicked one
        clickedView.highlight();

        // change the span above the paper
        $("#carName").text(clickedView.model.attr('text/text'));;
    });

    var c1 = new joint.shapes.basic.Rect({
        position: { x: 50, y: 70 },
        size: { width: 100, height: 40 },
        attrs: { text: { text: "c1" } }
    });

    var c2 = new joint.shapes.basic.Rect({
        position: { x: 50, y: 170 },
        size: { width: 100, height: 40 },
        attrs: { text: { text: "c2" } }
    });

    var c3 = new joint.shapes.basic.Rect({
        position: { x: 50, y: 270 },
        size: { width: 100, height: 40 },
        attrs: { text: { text: "c3" } }
    });

    graph.addCell(c1);
    graph.addCell(c2);
    graph.addCell(c3);

    // c1 moves towards x
    cars.push(
        {
            graphObject: c1,
            velocityX: 10,
            velocityY: 0
        }
    );

    // c2 goes diagonally
    cars.push(
        {
            graphObject: c2,
            velocityX: 10,
            velocityY: 10
        }
    );

    // c3 moves towards y
    cars.push(
        {
            graphObject: c3,
            velocityX: 0,
            velocityY: 10
        }
    );
}

function DrawLoop(){
    $.each(cars, function (index, car) {
        var position = car.graphObject.get('position');
        newX = position.x + car.velocityX;
        newY = position.y + car.velocityY;

        car.graphObject.position(newX, newY);

        console.log(car.graphObject.attr('text/text') + " - setting position to " + newX, ", " + newY );
    });

    setTimeout(DrawLoop, 1000);
}