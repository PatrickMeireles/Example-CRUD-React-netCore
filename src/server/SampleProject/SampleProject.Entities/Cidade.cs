using Entities.Base;

namespace Entities
{
    public class Cidade : BaseEntity
    {
        public string Descricao { get; set; }

        public string UF { get; set; }
    }
}
