$(document).ready(function () {

    $("#newNodeForm").on("submit", function (event) {
        event.preventDefault();
        let value = $("#newNodeInput").val().trim();
        value = Number.parseInt(value);
        console.log(value);
        if(!isNaN(value)){
            tree.insertValue(value);
            update(root());
        }
        $("#newNodeInput").val("");
        return root;
    })

    $("#newNodeInput").on("input", function (event) {
        console.log(event.target.value);
        const value = event.target.value.trim();
        console.log(value);
        if(!$.isNumeric(value)){
            $("#newNodeInput").val(Number.parseInt(value) || "");
        }
        $("#newNodeInput").val(event.target.value.trim());
    })
})