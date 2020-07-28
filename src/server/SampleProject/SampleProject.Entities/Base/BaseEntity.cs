using System.ComponentModel.DataAnnotations;

namespace Entities.Base
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
