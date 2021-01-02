using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalRChat.Hubs; // make SignalRChat.Hubs visible inside Startup.cs

namespace SignalRChat
{
    public class Startup
    {
        readonly string AllowEverything = "AllowEverything";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configure CORS to let the react app connect via SignalR (it is hosted under a different origin; http://localhost:3000)
            services.AddCors(options => {
                options.AddPolicy(name: AllowEverything, builder => {
                    builder
                        .AllowAnyHeader() // necessary to establish SignalR connection from react app
                        .AllowCredentials() // necessary to establish SignalR connection from react app
                        //.AllowAnyOrigin(); // does not work together with .AllowCredentials(), URLs need to be listed explicitly
                        .WithOrigins("http://localhost:3000"); // allow the react app to do CORS
                });
            });

            services.AddRazorPages();
            services.AddSignalR(); // add SignalR as a service to the dependency injection container
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            // Enable CORS to let the react app connect via SignalR (it is hosted under a different origin; http://localhost:3000)
            app.UseCors(AllowEverything);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapHub<ChatHub>("/chathub"); // configure an endpoint using ChatHub on route /chathub
            });
        }
    }
}
