//Get data and insert its to table with jquery when click button
$("#btn").click(function () {
	var SearchBy = $("#SearchBy").val();	//input
	var SearchValue = $("#Search").val();	//input
	var SetData = $("#dataTable");			//target html element
	SetData.html("");
	$.ajax({
		type: "POST",
		url: "/Contact/GetSearchingData?SearchBy=" + SearchBy + "&SearchValue=" + SearchValue, // or write to below -> data : {SearchBy : SearchBy, SearchValue : SearchValue }
		contentType: "html",
		success: function (result) {
			if (result.length == 0) {
				SetData.append('<tr style="color:red"><td colspan="4">No match data.</td></tr>')
			}
			else {
				$.each(result, function (index, value) {
					var Data = "<tr>" +
						"<td>" + value.fullName + "</td>" +
						"<td>" + value.phoneNumber + "</td>" +
						"<td>" + value.address + "</td>" +
						"<td> <a class='btn btn-warning' href='@Url.Action("EditContact", "Contact", new { id = String.Empty})/"+value.id+"'>Edit</a>&nbsp" +	//this and following are for Asp.net MVC
						"<a class='btn btn-primary' href='@Url.Action("DetailContact", "Contact", new { id = String.Empty})/"+value.id+"'>Details</a>&nbsp"+
						"<a class='btn btn-danger' href='@Url.Action("DelContact", "Contact", new { id = String.Empty})/"+value.id+"'>Delete</a>&nbsp</td>"+
						"</tr>";
					SetData.append(Data);
				});
			}
		}
	});
});

