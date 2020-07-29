using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SampleProject.Infrastructure.Data.EntityConfig
{
    public class CidadeConfig : IEntityTypeConfiguration<Cidade>
    {
        public void Configure(EntityTypeBuilder<Cidade> builder)
        {
            builder.ToTable("Cidades");

            builder.Property(c => c.Nome)
                   .HasColumnType("varchar(150)")
                   .IsRequired();

            builder.Property(c => c.Codigo)
                   .IsRequired();

            builder.Property(c => c.UF)
                   .HasColumnType("char(2)")
                   .IsRequired();
        }
    }
}
