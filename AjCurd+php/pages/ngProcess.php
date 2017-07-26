<?php
include "connection.php";

$postdata = file_get_contents("php://input");
$postdata = json_decode($postdata);
$action = $postdata->action;
$data = $postdata->data;

if($action == "getEmployees"){
		$com = $database->conn->prepare("SELECT * from employees");
		$com->execute(array("%$data%"));
		print_r(json_encode($com->fetchAll(PDO::FETCH_ASSOC)));
}

if($action == "addEmployee"){
		$cmd = "INSERT into employees (empName, empEmail, empSalary, active) values ('$data->empName', '$data->empEmail' , '$data->empSalary', '$data->active')";
		$com = $database->conn->prepare($cmd);
		$com->execute();
}

if($action == "updateEmployee"){
		$cmd = "UPDATE employees set empName = '$data->empName' , empEmail = '$data->empEmail', empSalary = '$data->empSalary' , active = '$data->active' where empID = '$data->empID'";
		$com = $database->conn->prepare($cmd);
		$com->execute();
}

if($action == "deleteEmployee"){
		$cmd = "DELETE from employees where empId = '$data->empID'";
		$com = $database->conn->prepare($cmd);
		$com->execute();
}

?>