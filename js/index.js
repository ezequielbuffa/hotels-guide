$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval:2000
    });

    $('#contact').on('show.bs.modal', function (e){
        console.log('modal is showing');
        $('#modalButton').removeClass('btn-info'); 
        $('#modalButton').addClass('btn-primary');
        $('#modalButton').prop('disabled', true);
    });

    $('#contact').on('shown.bs.modal', function (e){
        console.log('modal shown')
    });
    $('#contact').on('hide.bs.modal', function (e){
        console.log('modal hide it self')
    });
    $('#contact').on('hidden.bs.modal', function (e){
        console.log('modal is hidden');

        $('#modalButton').prop('disabled', false);
        $('#modalButton').addClass('btn-info');
    });
});