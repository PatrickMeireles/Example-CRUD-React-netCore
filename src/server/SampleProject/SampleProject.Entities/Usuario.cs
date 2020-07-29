using Entities.Base;
using System;

namespace Entities
{
    public class Usuario : BaseEntity
    {
        public string Login { get; set; }

        public string Senha { get; set; }

        public DateTime DataAtivacao { get; set; }

        public DateTime? DataInativacao { get; set; }

        public int IdPessoa { get; set; }

        public Pessoa Pessoa { get; set; }
    }
}
