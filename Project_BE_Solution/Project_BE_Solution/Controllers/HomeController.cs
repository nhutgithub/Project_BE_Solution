using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_BE_Solution.Models;
using Project_BE_Solution.Models.Data.EF;
using Project_BE_Solution.Models.Data.Entities;
using System.Diagnostics;
using System.Net;
using System.Numerics;
using System.Xml.Linq;

namespace Project_BE_Solution.Controllers
{
    public class HomeController : Controller
    {
        private readonly BEDbContext _dbContext;

        public HomeController(BEDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var data = await _dbContext.Employees.ToListAsync();
                ViewBag.data = data;
                return View();
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }
        [HttpPost]
        public async Task<int> AddEmployee(string name, string email, string address, string phone)
        {
            try
            {
                var data = await _dbContext.Employees.SingleOrDefaultAsync(x => x.Name == name);
                if (data == null)
                {
                    var employee = new Employee();
                    employee.Name = name;
                    employee.Email = email;
                    employee.Address = address;
                    employee.Phone = phone;
                    _dbContext.Employees.Add(employee);
                    await _dbContext.SaveChangesAsync();
                    return 1;
                }
                return 0;
            }
            catch(Exception ex)
            {
                return -1;
            }
        }
        [HttpDelete]
        public async Task<int> DeleteEmployee(int idEmployee)
        {
            try
            {
                var data = await _dbContext.Employees.SingleOrDefaultAsync(x => x.Id == idEmployee);
                if (data != null)
                {
                    _dbContext.Remove(data);
                    await _dbContext.SaveChangesAsync();
                    return 1;
                }
                return 0;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}