﻿// <auto-generated />
using System;
using BlogLab.Web.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BlogLab.Web.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230205133234_InitialPersistedGrantDbMigration")]
    partial class InitialPersistedGrantDbMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BlogLab.Models.Account.ApplicationUser", b =>
                {
                    b.Property<int>("ApplicationUserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ApplicationUserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ApplicationUserId");

                    b.ToTable("ApplicationUsers");
                });

            modelBuilder.Entity("BlogLab.Models.Account.ApplicationUserCreate", b =>
                {
                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.ToTable("ApplicationUserCreates");
                });

            modelBuilder.Entity("BlogLab.Models.Account.ApplicationUserIdentity", b =>
                {
                    b.Property<int>("ApplicationUserId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NormalizedEmail")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NormalizedUsername")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("ApplicationUserIdentitys");
                });

            modelBuilder.Entity("BlogLab.Models.Account.ApplicationUserLogin", b =>
                {
                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.ToTable("ApplicationUserLogins");
                });

            modelBuilder.Entity("BlogLab.Models.Blog.Blog", b =>
                {
                    b.Property<int>("ApplicationUserId")
                        .HasColumnType("integer");

                    b.Property<int>("BlogId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("character varying(5000)");

                    b.Property<int?>("PhotoId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<DateTime>("UpdateDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("Blogs");
                });

            modelBuilder.Entity("BlogLab.Models.Blog.BlogCreate", b =>
                {
                    b.Property<int>("BlogId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("character varying(5000)");

                    b.Property<int?>("PhotoId")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.ToTable("BlogCreates");
                });

            modelBuilder.Entity("BlogLab.Models.Blog.BlogPaging", b =>
                {
                    b.Property<int>("Page")
                        .HasColumnType("integer");

                    b.Property<int>("PageSize")
                        .HasColumnType("integer");

                    b.ToTable("BlogPagings");
                });

            modelBuilder.Entity("BlogLab.Models.BlogComment.BlogComment", b =>
                {
                    b.Property<int>("ApplicationUserId")
                        .HasColumnType("integer");

                    b.Property<int>("BlogCommentId")
                        .HasColumnType("integer");

                    b.Property<int>("BlogId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("character varying(300)");

                    b.Property<int?>("ParentBlogCommentId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("UpdateDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("BlogComments");
                });

            modelBuilder.Entity("BlogLab.Models.BlogComment.BlogCommentCreate", b =>
                {
                    b.Property<int>("BlogCommentId")
                        .HasColumnType("integer");

                    b.Property<int>("BlogId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("character varying(300)");

                    b.Property<int?>("ParentBlogCommentId")
                        .HasColumnType("integer");

                    b.ToTable("BlogCommentCreates");
                });

            modelBuilder.Entity("BlogLab.Models.Exception.ApiException", b =>
                {
                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StatusCode")
                        .HasColumnType("integer");

                    b.ToTable("ApiExceptions");
                });

            modelBuilder.Entity("BlogLab.Models.Photo.Photo", b =>
                {
                    b.Property<int>("ApplicationUserId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PhotoId")
                        .HasColumnType("integer");

                    b.Property<string>("PublicId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("UpdateDate")
                        .HasColumnType("timestamp with time zone");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("BlogLab.Models.Photo.PhotoCreate", b =>
                {
                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PublicId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("PhotoCreates");
                });

            modelBuilder.Entity("BlogLab.Models.Settings.CloudinaryOptions", b =>
                {
                    b.Property<string>("ApiKey")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ApiSecret")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CloudName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("CloudinaryOptionss");
                });
#pragma warning restore 612, 618
        }
    }
}
