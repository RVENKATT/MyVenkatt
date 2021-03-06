var app = angular.module('myApp' , []);

app.filter('active', function(){
	
	return function(input){
	if(input == '1')
		return 'Yes';
	else
		return 'No';	
	};
});

app.controller('myCtrl' , function($scope , $http){

	$scope.employees = [];
	$scope.employeeData = {};
	$scope.selected = {};

	$scope.addEmployee = function(){
		
		$scope.employees.push({
			empName : $scope.empName,
			empEmail : $scope.empEmail,
			empSalary : $scope.empSalary,
			active : $scope.empActive
		});
		console.log($scope.employees);
	};


	$scope.addEmployeetoDB = function(){
		
		$scope.employeeData = {
			empName : $scope.empName,
			empEmail : $scope.empEmail,
			empSalary : $scope.empSalary,
			active : $scope.empActive
		};
		
		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'addEmployee',
			data : $scope.employeeData
		});
		res.success(function(data, status, headers, config) {
			console.log("emp added");
			$scope.getEmployees();
		});
		res.error(function(data, status, headers, config) {
			console.log("emp adding failed");
		});
	};

	$scope.getEmployees = function(){
		
		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'getEmployees'
		});
		res.success(function(data, status, headers, config) {
			$scope.employees = data;
		});
		res.error(function(data, status, headers, config) {
			console.log("Error adding to DB");
		});
	};
	
	$scope.deleteEmployee = function(employee){

		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'deleteEmployee',
			data : employee
		});
		res.success(function(data, status, headers, config) {
			console.log(data);
			$scope.getEmployees();
		});
		res.error(function(data, status, headers, config) {
			console.log("Error deleting");
		});
	};
	
	
	$scope.getTemplate = function (employee) {
        if (employee.empID === $scope.selected.empID){
			return 'edit';
		}
        else return 'display';
    };
	
	$scope.reset = function () {
        $scope.selected = {};
    };
	
	$scope.editEmployee = function (employee) {
        $scope.selected = angular.copy(employee);
    };
	
	$scope.updateEmployee = function(employee) {
		
		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'updateEmployee',
			data : employee
		});
		res.success(function(data, status, headers, config) {
			console.log(data);
			$scope.reset();
			$scope.getEmployees();
		});
		res.error(function(data, status, headers, config) {
			console.log("Error updating");
		});
	};
});