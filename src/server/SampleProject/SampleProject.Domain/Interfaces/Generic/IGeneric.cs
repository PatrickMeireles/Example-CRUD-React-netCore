using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SampleProject.Domain.Interfaces.Generic
{
    public interface IGeneric<TEntity> : IDisposable where TEntity : class
    {
        Task<TEntity> Add(TEntity entity);
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(int id);
        Task<TEntity> Update(TEntity entity);
        Task<Boolean> Delete(int id);
        Task<int> SaveChanges();
    }
}
