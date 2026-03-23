using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Data
{
    public class BookstoreDbContext: DbContext
    {
        public BookstoreDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}
