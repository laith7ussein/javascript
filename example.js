
var element_inside_the_scaled_container = $('#element');

$(element_inside_the_scaled_container).draggable({

    drag: function (event, ui) {

        var constants = normalize_ui_position('#elem_container', ui);

        console.log(constants); // They could be useful!

    }

});
