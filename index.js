'use strict';

const apiKey = 'Lto3cYpgRTggDgOMAsGl1D4bxZoWGj1qKRAKYDtX';
const parksURL = 'https://developer.nps.gov/api/v1/parks';

function getStates(){
    const checkboxArr=[];
    $('input[type=checkbox]').each(function(){        
        if($(this).is(':checked')) {
            checkboxArr.push($(this).val());
        };
    })            
    return checkboxArr.join(',');
}

function getResults(states, limit){
    let url = parksURL + `?stateCode=${states}` + `&limit=${limit}`+ `&api_key=${apiKey}`;
    fetch(url)
        .then(response=>response.json())
        .then(responseJson=>displayResults(responseJson))
}


function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i=0; i<responseJson.data.length; i++){
        $('#results-list').append(`
        <li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
        </li>
        `);
    };
}


$('form').submit(function(){
    event.preventDefault();
    let checked=$('input[type=checkbox]:checked').length;
    if(!checked) {
        alert("You must select atleast one checkbox")
        return false;
    }
    let limit = $('#limitNum').val();
    let states = getStates();
    getResults(states, limit);
})

$('#selectAll').click(function(){
    $('input[type="checkbox"]').prop('checked',true);
});

$('#deselectAll').click(function(){
    $('input[type="checkbox"]:checked').prop('checked',false);
});
