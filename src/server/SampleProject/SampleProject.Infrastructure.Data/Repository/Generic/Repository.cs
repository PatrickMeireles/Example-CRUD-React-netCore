using Microsoft.EntityFrameworkCore;
using SampleProject.Domain.Interfaces.Generic;
using SampleProject.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleProject.Infrastructure.Data.Repository.Generic
{
    public class Repository<TEntity> : IGeneric<TEntity> where TEntity : class
    {
        protected readonly BaseContext _db;
        protected readonly DbSet<TEntity> _dbSet;

        public Repository(BaseContext context)
        {
            _db = context;
            _dbSet = _db.Set<TEntity>();
        }

        public virtual TEntity Add(TEntity entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public void Delete(int id)
        {
            var obj = _dbSet.Find(id);
            _dbSet.Remove(obj);
        }

        public void Dispose()
        {
            _db.Dispose();
            GC.SuppressFinalize(this);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public TEntity GetById(int id) => _dbSet.Find(id);

        public int SaveChanges() => _db.SaveChanges();

        public TEntity Update(TEntity entity)
        {
            _dbSet.Update(entity);
            return entity;
        }
    }
}
