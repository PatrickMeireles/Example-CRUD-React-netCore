using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SampleProject.Application.Validation.Util
{
    public class Validator
    {
        public Dictionary<string, string> fieldErrors { get; set; }

        public List<String> errors { get; set; }

        public Validator()
        {
            this.fieldErrors = new Dictionary<string, string>();
            this.errors = new List<string>();
        }

        public Validator(FluentValidation.Results.ValidationResult results)
        {
            if (!results.IsValid)
            {
                var erros = results.Errors;

                fieldErrors = erros.Where(x => x.PropertyName != "" && x.PropertyName != null).ToDictionary(x => x.PropertyName, x => x.ErrorMessage);
                                   

            }
        }
    }
}
