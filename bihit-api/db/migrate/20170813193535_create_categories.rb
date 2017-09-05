class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :naziv
      t.text :opis

      t.timestamps
    end
  end
end
