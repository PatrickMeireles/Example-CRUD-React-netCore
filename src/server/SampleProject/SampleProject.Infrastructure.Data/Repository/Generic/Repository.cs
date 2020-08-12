using Microsoft.EntityFrameworkCore;
using SampleProject.Domain.Interfaces.Generic;
using SampleProject.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public virtual async Task<TEntity> Add(TEntity entity)
        {
           await _dbSet.AddAsync(entity);
           await _db.SaveChangesAsync();

            return entity;
        }

        public async Task<Boolean> Delete(int id)
        {
            try
            {
                var obj = await _dbSet.FindAsync(id);
                _dbSet.Remove(obj);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            _db.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task<IEnumerable<TEntity>> GetAll() => await _dbSet.ToListAsync();

        public async Task<TEntity> GetById(int id) => await _dbSet.FindAsync(id);

        public async Task<int> SaveChanges() => await _db.SaveChangesAsync();

        public virtual async Task<TEntity> Update(TEntity entity)
        {
            _dbSet.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
