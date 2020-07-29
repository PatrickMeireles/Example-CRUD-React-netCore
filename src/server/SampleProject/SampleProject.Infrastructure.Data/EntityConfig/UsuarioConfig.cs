using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleProject.Infrastructure.Data.EntityConfig
{
    public class UsuarioConfig : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuarios");

            builder.Property(x => x.Login)
                   .HasColumnType("varchar(180)")
                   .IsRequired();

            builder.Property(x => x.Senha)
                   .HasColumnType("varchar(100)")
                   .IsRequired();

            builder.Property(x => x.DataAtivacao)
                   .IsRequired();
            
            builder.HasOne(x => x.Pessoa)
                   .WithOne()
                   .HasForeignKey<Usuario>(x => x.IdPessoa)
                   .HasPrincipalKey<Pessoa>(x => x.Id);
        }
    }
}
