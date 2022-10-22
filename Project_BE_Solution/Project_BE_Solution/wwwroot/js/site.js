$("#btnAdd").on('click', function (e) {
    e.preventDefault();
    $("#modalLabel").html('Add Employee');
    $("#btnAdd_Delete").html("Add");
    var html = '';
    html += '<div>'
    html += '<label>Name*</label>'
    html += '<input id="name" class="form-control" placeholder="Ex: Maria Rivera" />'
    html += '</div>'
    html += '<div>'
    html += '<label>Email*</label>'
    html += '<input id="email" class="form-control" type="email" placeholder="Ex: a@gmail.com"/>'
    html += '</div>'
    html += '<div>'
    html += '<label>Address*</label>'
    html += '<textarea id="address" class="form-control" placeholder="Ex: Japan" ></textarea>'
    html += '</div>'
    html += '<div>'
    html += '<label>Phone*</label>'
    html += '<input id="phone" class="form-control" type="tel" placeholder="Ex: (123)-456-7899" />'
    html += '</div>'
    $(".modal-body").html(html);
    $("#btnAdd_Delete").removeClass("btn-danger").addClass("btn-success");
    $('#comfirmAdd_Delete').modal('show'); 
    $("#btnAdd_Delete").on('click', function (e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var address = $("#address").val();
        var phone = $("#phone").val();
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var isEmail = emailRegex.test(email);
        var phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        var isPhone = phoneRegex.test(phone);
        if (isEmail == false) {
            alert("Vui lòng nhập đúng định dạng email!");
        }
        if (isPhone == false) {
            alert("Vui lòng nhập đúng định dạng số điện thoại!");
        }
        if (name != "" && isEmail == true && address != "" && isPhone == true) {
            $.ajax({
                type: "POST",
                url: '/Home/AddEmployee',
                data: {
                    name: $("#name").val(),
                    email: $("#email").val(),
                    address: $("#address").val(),
                    phone: $("#phone").val()
                },
                success: function (success) {
                    if (success == 1) {
                        alert("Thêm thành công!");
                        location.reload();
                    }
                    if (success == 0) {
                        alert("Đã tồn tại!");
                        location.reload();
                    }
                    if (success == -1) {
                        alert("Thất bại!");
                        location.reload();
                    }
                },
                error: function (e) {
                    alert("Lỗi!");
                    location.reload();
                }
            });
        }
        if (name == "" || address == "") {
            alert("Vui lòng nhập đầy đủ thông tin");
        }
    })
});
function deleteEmployee(idEmployee) {
    $("#modalLabel").html('Delete Employee');
    $("#btnAdd_Delete").html("Delete");
    $(".modal-body").html('Are you sure want to delete these Records?<p style="color: #ffca44;font-size: 10px;" class="mt-2">This action cannot be undone</p>');
    $("#btnAdd_Delete").on('click', function (e) {
        $.ajax({
            type: "DELETE",
            url: '/Home/DeleteEmployee',
            data: {
                idEmployee: idEmployee
            },
            success: function (success) {
                if (success == 1) {
                    alert("Xóa thành công!");
                    location.reload();
                }
                if (success == 0) {
                    alert("Không tồn tại!");
                    location.reload();
                }
                if (success == -1) {
                    alert("Thất bại!");
                    location.reload();
                }
            },
            error: function (e) {
                alert("Lỗi!");
                location.reload();
            }
        });
    })
}
