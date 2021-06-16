function enableDark() {
    var element = document.body;
    // element.classList.toggle("dark-mode");
 }

 $(function() {
    var tambola = {
        selectedNumbers: [],
        generateRandom: function() {
            var min = 1;
            var max = 89;
            var random = Math.floor(Math.random() * (max - min + 1)) + min;
            return random;
        },
        generateNextRandom: function() {
            if (tambola.selectedNumbers.length > 88) {
                alert("All numbers Exhausted");
                return 0;
            }
            var random = tambola.generateRandom();
            while ($.inArray(random, tambola.selectedNumbers) > -1) {
                random = tambola.generateRandom();
            }
            tambola.selectedNumbers.push(random);
            return random;
        }
    };
    $('td').each(function() {
        var concatClass = this.cellIndex + "" + this.parentNode.rowIndex;
        var numberString = parseInt(concatClass, 10).toString();
        $(this).addClass("cell" + numberString).text(numberString);
    });
    $('#btn').click(function() {
        var random = tambola.generateNextRandom().toString();
        $('.main span').text(random);
        $('td.cell' + random).addClass('selected');
    });
});