using Entities.Base;
using System;

namespace Entities
{
    public class Cidade : BaseEntity
    {
        public int Codigo { get; set; }

        public string Nome { get; set; }

        public string UF { get; set; }

        public string Descricao { get { return String.Format("{0} - {1}", this.Nome, this.UF); } }
    }
}
