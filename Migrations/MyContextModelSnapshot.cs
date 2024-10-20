﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SpaProject.Db;

#nullable disable

namespace spaproject.Migrations
{
    [DbContext(typeof(MyContext))]
    partial class MyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("SpaProject.Models.Offer", b =>
                {
                    b.Property<int>("OfferId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("OfferDescription")
                        .HasColumnType("TEXT");

                    b.Property<int>("OfferDuration")
                        .HasColumnType("INTEGER");

                    b.Property<string>("OfferImageUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("OfferName")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("OfferPrice")
                        .HasColumnType("TEXT");

                    b.Property<int>("OfferTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("OfferId");

                    b.HasIndex("OfferTypeId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("SpaProject.Models.OfferType", b =>
                {
                    b.Property<int>("OfferTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("OfferTypeName")
                        .HasColumnType("TEXT");

                    b.HasKey("OfferTypeId");

                    b.ToTable("OfferTypes");
                });

            modelBuilder.Entity("SpaProject.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SpaProject.Models.Offer", b =>
                {
                    b.HasOne("SpaProject.Models.OfferType", "OfferType")
                        .WithMany("Offers")
                        .HasForeignKey("OfferTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OfferType");
                });

            modelBuilder.Entity("SpaProject.Models.OfferType", b =>
                {
                    b.Navigation("Offers");
                });
#pragma warning restore 612, 618
        }
    }
}
