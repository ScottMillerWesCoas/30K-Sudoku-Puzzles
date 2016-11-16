
$(document).ready(function(){
    var rand;  
    //'SUDOKU' at top of board signals html file found this js file
    $('.board').prepend('SUDOKU'+ '<br>').css({'color': 'white', 'border': '1px solid black', 'border-radius': '10px', 'text-align': 'center', 'font-size':'40px', 'font-family':'Anton', 'font-weight':'bolder'});  
    // Initial AJAX call so board auto-populates with an easy board when user loads page
    //AJAX calls are used so BG video is not disrupted by board changes
    $.ajax({
      url: "/easyData", 
      success: function(result){ 
        //Data retreived as string, must turn it into array
        var puzzle = result.split('');
        for (var i = 0; i < 9; i++){
          $('input[data-row=' + i + ']').each(function(j, el){
            $(el).val(puzzle[j + (9 * i)]); 
          });
        }
      } 
    }); 
   
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }; 
    //User actions invoke the following functions
    $('#validate').on('click', checkWin); 
    $('#newBoard').on('click', newBoard); 
    $('#easy').on('click', easy); 
    $('#medium').on('click', medium); 
    $('#hard').on('click', hard); 

    //Show board difficulty options when player clicks "new board" button
    function newBoard(){
      document.getElementById("myDropdown").classList.toggle("show");
    }

    //Display message saying 'new easy board being retreived', get easy board data with AJAX, display it
    function easy(){
      rand = Math.floor(Math.random() * 10000); 
      $('#message').text('Loading easy-difficulty puzzle # ' + rand + '...').css({"background-color": "#FFCCFF", "font-size": "400%", "font-family": "Roboto", "z-index": '10', 'border-radius': '5px', 'border': '1px solid black'}).animate({'opacity': 1}, 1000, function(){
        $('#message').delay(1000).animate({'opacity': 0}, 1500); 
      }); 
      setTimeout(function(){
        $.ajax({
        url: "/easyData", 
        success: function(result){ 
          var puzzle = result.split('');
          //Populate the board with data collected from puzzle
          for (var i = 0; i < 9; i++){
            $('input[data-row=' + i + ']').each(function(j, el){
              $(el).val(puzzle[j + (9 * i)]); 
            });
          }
        } 
       }); 
      }, 3500);
    }   

    //Display message saying 'new medium board being retreived', get medium board data with AJAX, display it
    function medium(){
      rand = Math.floor(Math.random() * 10000); 
      $('#message').text('Loading medium-difficulty puzzle # ' + rand + '...').css({"background-color": "#FFCCFF", "font-size": "400%", "font-family": "Roboto", "z-index": '10', 'border-radius': '5px', 'border': '1px solid black'}).animate({'opacity': 1}, 1000, function(){
        $('#message').delay(1000).animate({'opacity': 0}, 1500); 
      }); 
      setTimeout(function(){
        $.ajax({
          url: "/mediumData", 
          success: function(result){ 
            var puzzle = result.split('');
            for (var i = 0; i < 9; i++){
              $('input[data-row=' + i + ']').each(function(j, el){
                $(el).val(puzzle[j + (9 * i)]); 
              });
            }
          } 
        }); 
      }, 3500);  
    }

    //Display message saying 'new hard board being retreived', get hard board data with AJAX, display it
    function hard(){
      rand = Math.floor(Math.random() * 10000); 
      $('#message').text('Loading hard-difficulty puzzle # ' + rand + '...').css({"background-color": "#FFCCFF", "font-size": "400%", "font-family": "Roboto", "z-index": '10', 'border-radius': '5px', 'border': '1px solid black'}).animate({'opacity': 1}, 1000, function(){
        $('#message').delay(1000).animate({'opacity': 0}, 1500); 
      }); 
      setTimeout(function(){
        $.ajax({
          url: "/hardData", 
          success: function(result){ 
            var puzzle = result.split('');
            for (var i = 0; i < 9; i++){
              $('input[data-row=' + i + ']').each(function(j, el){
                $(el).val(puzzle[j + (9 * i)]); 
              });
            }
          } 
        }); 
      }, 3500);  
    }


    //Confirm every number from 1-9 is represented in each row, column and box
    //if not, player has not won, engage else statment, if yes, player has won, engage winLoss === true func
    function checkWin (){
      var checkArr = []; 
      var dataNum = ['0','1','2','3','4','5','6','7','8'];
      var checkAgainst = ['1','2','3','4','5','6','7','8','9'];
      var winLoss = true;  
      $('input').each(function(i, el){
        if ($(el).val() === '-' || $(el).val() === ''){
            $('h1').text('Not yet...').addClass('lose'); 
        } 
      });
      for (var i = 0; i < 9; i++){
        $("input[data-column=" + dataNum[i] + "]").each(function(i, el){
          checkArr.push($(el).val()); 
        }); 
       for (var j = 0; j < checkAgainst.length; j++){
          if (checkArr.indexOf(checkAgainst[j]) === -1){
              //console.log('no ', checkAgainst[j], 'at data-column', dataNum[i]);
              winLoss = false; 
          }   
        }
        checkArr = []; 
        }
        for (var k = 0; k < 9; k++){
        $("input[data-row=" + dataNum[k] + "]").each(function(i, el){
            checkArr.push($(el).val()); 
        }); 
         for (var l = 0; l < checkAgainst.length; l++){
            if (checkArr.indexOf(checkAgainst[l]) === -1){
                //console.log('no ', checkAgainst[l], 'at data-row', dataNum[k]);
                winLoss = false; 
            }   
          }
          checkArr = []; 
        }
        $(".box").each(function(i, el){
            $(el).find('input').each(function(j, iel){
              checkArr.push($(iel).val()); 
               if (checkArr.length === 9){
                for (var m = 0; m < checkAgainst.length; m++){
                  if (checkArr.indexOf(checkAgainst[m]) === -1){
                    //console.log('no ', checkAgainst[m], 'in box number', i);
                    winLoss = false; 
                  }
                  else if (m === checkAgainst.length - 1 && checkArr.indexOf(checkAgainst[m]) !== -1){
                    checkArr = []; 
                  }      
                }
              }

            }); 
       
        }); 

     if (winLoss === true){
      rand = Math.floor(Math.random() * 10000); 
      $('h1').text('Correct! Loading a new puzzle shortly...').addClass('win').removeClass('lose').animate({'opacity': 1}, 1500, function(){
      $('#result').animate({'opacity': 0}, 2500); 
      });
      setTimeout(function(){
        medium(); 
      }, 3500);  
      }  
      else {
        rand = Math.floor(Math.random() * 10000); 
        $('h1').text('Not yet...').addClass('lose').animate({'opacity': 1}, 1500, function(){
          $('#result').animate({'opacity': 0}, 2500); 
        }); 
      }   
    }

}); 





  



