$(function(){
    var $newItemButton, $newItemForm, $list;
    $newItemButton = $('#newItemButton');
    $newItemForm = $('#newItemForm');
    $list = $('ul');


    $newItemButton.show();
    $newItemForm.hide();
    $('#newItemButton').on('click', function(){
        $newItemButton.hide();
        $newItemForm.show();
    })

    // $newItemForm.on('submit', function(e){
    //     e.preventDefault();
    //     var text = $('input:text').val();
    //     $list.append('<li>' + text + '</li>');
    //     $('input:text').val('');   
    // })

    // $list.on('click', 'li', function() {
    //     var $this = $(this);              
    //     $this.animate({                  
    //         opacity: 0.0,
    //         paddingLeft: '+=180'
    //       }, 500, 'swing', function() {    
    //         $this.remove();                
    //       });
             
    //     })        
})

const deleteItem = document.querySelector("#item")

deleteItem.addEventListener('click', _ =>{
    fetch("/lists", {
        method: 'delete',
        Headers: {'content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'itemName'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })
})