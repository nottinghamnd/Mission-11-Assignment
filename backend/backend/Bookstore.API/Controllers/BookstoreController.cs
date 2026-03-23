using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _context;

        public BookstoreController(BookstoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1)
        {
            var booklist = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var totalNumBooks = _context.Books.Count();
            var passToFrontend = new
            {
                Books = booklist,
                TotalNumBooks = totalNumBooks
            }; //could build the object in the return statement or build a model/class and just return the model

            return Ok(passToFrontend);
        }

    }
}
