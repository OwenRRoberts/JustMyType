$(document).ready(function () {


    //hide top keyboard
    $('#keyboard-upper-container').css('display', 'none');

    //hide lowercase and bring back uppercase on shift hold
    $(document).keydown(function (e) {
        if (e.shiftKey) {
            $('#keyboard-lower-container').css('display', 'none');
            $('#keyboard-upper-container').css('display', 'block');
        }
    })

    //hide uppercase and bring back lowercase on shift release
    $(document).keyup(function () {
        $('#keyboard-upper-container').css('display', 'none');
        $('#keyboard-lower-container').css('display', 'block');
    })

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    //show where user is, sentence and letter
    let s = 0;
    let l = 0;
    $('<p></p>').text(sentences[s]).appendTo('#sentence');
    $('<h3></h3>').text(sentences[s][l]).appendTo('#target-Letter');

    //how many mistakes there are at the beginning, 0
    let mistakeNum = 0;
    let start = 0;

    //waits for keypress
    $(document).on('keypress', function (d) {
        let k = (d.keyCode || d.which);

        $('#' + k).css('background-color', 'yellow');

        //change color back on key release
        $(document).keyup(function () {
            $('#' + k).css('background-color', 'white');
        })

        if (l == 0 && s == 0) {
            let time = new Date();
            start = time.getMinutes();
        }

        //key key of current letter hopefully
        let b = (sentences[s][l]).charCodeAt();

        //compare current letter to current stroke 
        if (k == b) {

            //show green check on correct keystroke
            $('#feedback').attr('class', 'glyphicon-ok').css('display', 'initial');

            //move yellow highlight
            $('#yellow-block').css('margin-left', "+15px");

            //go to next letter
            l++;

            //check if typer is at the end of sentences[s]
            if (l == sentences[s].length) {

                //check to see if on last sentence
                if (s + 1 == sentences.length) {

                    let timeUp = new Date();
                    let end = timeUp.getMinutes();

                    //how many minutes from begininng the exercise
                    let timing = end - start;

                    //get words per minute
                    let speed = Math.round((55 - mistakeNum) / timing);

                    //replace wpm w/ sentence 
                    $('#yellow-block').css('display', 'none');
                    $('#sentence').text("Look at you!  You finished typing gibberish!  You typed " + speed + " words per minute!");

                    //who wants to play again?
                    $(document).off('keypress');
                    $('#target-letter').text('click anywhere to play again!');
                    $(document).click(function () {
                        location.reload();
                    })

                    //end of sentence, but not finished yet
                } else {

                    //next sentence, reset l back to 0
                    s++;
                    l = 0;

                    $('#sentence').text(sentences[s]);
                    $('#target-letter').text(sentences[s][l]);

                    //move highlighters
                    $('#yellow-block').css('margin-left', 'initial')

                    //clear out feedback 
                    $('#feedback').css('display', 'none');
                }
                //they haven't reached the end yet
            } else {
                $('#target-letter').text(sentences[s][l]);
            }

            //wrong keystroke
        } else {

            //bad buzz tone (or red x)
            $('#feedback').attr('class', 'glyphicon-remove').css('display', 'initial');

            //increment up mistakes
            mistakeNum++;
        }
    })
})