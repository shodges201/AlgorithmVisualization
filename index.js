$(document).ready(function () {

    $("#newNodeForm").on("submit", function (event) {
        event.preventDefault();
        let value = $("#newNodeInput").val().trim();
        value = Number.parseInt(value);
        console.log(value);
        if(!isNaN(value)){
            tree.insertValue(value);
            treeUI.update(root());
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

    $("#searchNodeForm").on("submit", function (event) {
        event.preventDefault();
        let value = $("#searchNodeInput").val().trim();
        value = Number.parseInt(value);
        console.log(value);
        if(!isNaN(value)){
            treeUI.search(value, root());
        }
        $("#searchNodeInput").val("");
        return root;
    })

    $("#searchNodeInput").on("input", function (event) {
        console.log(event.target.value);
        const value = event.target.value.trim();
        console.log(value);
        if(!$.isNumeric(value)){
            $("#searchNodeInput").val(Number.parseInt(value) || "");
        }
        $("#searchNodeInput").val(event.target.value.trim());
    })


})