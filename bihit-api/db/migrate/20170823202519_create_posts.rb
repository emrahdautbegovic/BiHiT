class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.references :user, foreign_key: true
      t.string :title
      t.text :short
      t.text :long
      t.references :subcategory, foreign_key: true

      t.timestamps
    end
  end
end
