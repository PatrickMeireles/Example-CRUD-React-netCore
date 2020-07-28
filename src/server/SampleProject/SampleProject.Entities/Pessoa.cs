using Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class Pessoa : BaseEntity
    {
        public string Nome { get; set; }

        public string Email { get; set; }

        public int IdCidade { get; set; }

        public Cidade Cidade { get; set; }

    }
}
