using Bookstore.API.Data;
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

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(
            int pageSize = 10,
            int pageNum = 1,
            [FromQuery] List<string>? bookCategories = null
        )
        {
            var query = _context.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var booklist = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var passToFrontend = new
            {
                Books = booklist,
                TotalNumBooks = totalNumBooks
            }; //could build the object in the return statement or build a model/class and just return the model

            return Ok(passToFrontend);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }
    }
}
