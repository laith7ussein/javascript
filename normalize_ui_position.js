/*
 * normalize_ui_position
 * Call this function inside drag() method of draggable library
 *
 * @param {string/object} scaled_container - The element which is scaled
 * @param {object} ui - the ui variable from to be normalized
 * @return {bool/object} - false for invalid input arguments and object of equation constants otherwise
 */

function normalize_ui_position ( scaled_container, ui ) {

    /**** INPUT Checking ****/

    if ( !ui.hasOwnProperty('position') ) {
        console.error('Invalid input ui variable!');
        return false;
    } else if ( !ui.position.hasOwnProperty('left') || !ui.position.hasOwnProperty('top') ) {
        console.error('Invalid input ui.position variable!');
        return false;
    };

    if ( typeof $(scaled_container) == typeof undefined ) {
        console.error('Undefined object!');
        return false;
    } else if ( !$(scaled_container).length ) { // Do not combine this condition with the previous one.
        console.error('Object not found!');
        return false;
    }

    if ( $(scaled_container).css('transform') === 'none' ) { // Unset CSS property
        $(scaled_container).css('transform', 'scale(1)');
    }

    if ( $(scaled_container).css('transform-origin') != 'top left' ) {
        // origin must be set to "top left" so the calculation equation operate correctly
        $(scaled_container).css('transform-origin', 'top left');
    }



    /**** Real work starts here ****/

    var constants = {
        _zoom : parseFloat($(scaled_container).css('transform').match(/-?\d+\.?\d*/g)[0]),
        _w    : $(scaled_container).innerWidth(),   // Width before scaling
        _h    : $(scaled_container).innerHeight(),  // Height before scaling
    }

    constants = Object.assign(constants, { // Append
        _sw   : constants._w * constants._zoom,     // Scaled width
        _sh   : constants._h *constants._zoom,      // Scaled height
    });

    constants = Object.assign(constants, {
        _ww   : constants._w - constants._sw,       // The displacement between origianl size and scaled size
        _hh   : constants._h - constants._sh
    });

    ui.position.top = ui.position.top + ui.position.top*constants._hh/constants._sh;
    ui.position.left = ui.position.left + ui.position.left*constants._ww/constants._sw;

    // ui.position will be updated automaticlly since object are passed by reference...

    return constants; // They could be useful!

}
