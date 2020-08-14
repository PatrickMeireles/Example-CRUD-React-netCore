using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SampleProject.Infrastructure.Data.EntityConfig
{
    public class PessoaConfig : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.ToTable("Pessoas");

            builder.Property(x => x.Nome)
                   .HasColumnType("varchar(100)")
                   .IsRequired();

            builder.Property(x => x.Email)
                    .HasColumnType("varchar(180)")
                    .IsRequired();


            builder.HasOne(x => x.Cidade)
                    .WithOne()
                    .HasForeignKey<Pessoa>(x => x.IdCidade)
                    .HasPrincipalKey<Cidade>(x => x.Id);

            builder.HasIndex(e => e.IdCidade).IsUnique(false);
        }
    }
}
