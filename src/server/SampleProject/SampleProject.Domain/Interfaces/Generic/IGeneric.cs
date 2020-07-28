using System;
using System.Collections.Generic;

namespace SampleProject.Domain.Interfaces.Generic
{
    public interface IGeneric<TEntity> : IDisposable where TEntity : class
    {
        TEntity Add(TEntity entity);
        IEnumerable<TEntity> GetAll();
        TEntity GetById(int id);
        TEntity Update(TEntity entity);
        void Delete(int id);
        int SaveChanges();
    }
}
